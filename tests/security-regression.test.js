const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const rules = fs.readFileSync(path.join(root, 'firestore.rules'), 'utf8');
const firebase = JSON.parse(fs.readFileSync(path.join(root, 'firebase.json'), 'utf8'));

test('private family collections are never publicly readable', () => {
  assert.doesNotMatch(rules, /allow\s+read\s*:\s*if\s+true/);
  assert.match(rules, /match \/memories\/\{memoryId\}[\s\S]*allow read: if isFamilyMember\(\)/);
  assert.match(rules, /match \/comments\/\{memoryId\}\/items\/\{commentId\}[\s\S]*allow read: if isFamilyMember\(\)/);
});

test('authorization fails closed and binds writes to authenticated email', () => {
  assert.doesNotMatch(html, /Whitelist check error[^\n]*allowing anyway/i);
  assert.match(rules, /request\.resource\.data\.uploadedBy\.email == request\.auth\.token\.email/);
  assert.match(rules, /request\.resource\.data\.author\.email == request\.auth\.token\.email/);
  assert.match(rules, /affectedKeys\(\)\.hasOnly\(\['caption'\]\)/);
});

test('untrusted media URLs pass through protocol and host validation', () => {
  assert.match(html, /function safeExternalUrl\(value\)/);
  assert.match(html, /function safeMediaUrl\(value\)/);
  assert.match(html, /const safeImages = images\.map\(safeMediaUrl\)\.filter\(Boolean\)/);
  assert.doesNotMatch(html, /wrap\.innerHTML\s*=\s*`<img src="\$\{user\.picture\}/);
  assert.doesNotMatch(html, /src="\$\{c\.author\.picture\}/);
});

test('upload selection has explicit count, MIME and size limits', () => {
  assert.match(html, /const MAX_UPLOAD_FILES = 9/);
  assert.match(html, /const ALLOWED_UPLOAD_TYPES = new Set/);
  assert.match(html, /file\.size > MAX_IMAGE_BYTES/);
  assert.match(html, /file\.size > MAX_VIDEO_BYTES/);
});

test('hosting sets baseline browser security headers', () => {
  const headers = firebase.hosting.headers.flatMap(entry => entry.headers);
  const keys = new Set(headers.map(header => header.key.toLowerCase()));
  for (const required of ['x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy']) {
    assert.ok(keys.has(required), `missing ${required}`);
  }
});

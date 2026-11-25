import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One out-of-office auto-reply for "The Funniest Out-of-Office": the sender
// is out until Monday, and their inbox has filed a restraining order against
// the laptop — with the sender siding with the inbox. The wildest surprise
// in the field, a second laugh in the last words ("honestly, I support it"),
// a real OOO shape in a dry personal voice, and not a word wasted.
const LINE =
  "I'm out of the office until Monday. My inbox has filed a restraining order against my laptop, and honestly, I support it.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-140 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error(`reply fails the gate: ${LINE.length} characters`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-140) and ties break on
// fewer bytes, so the entry is exactly the reply, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');

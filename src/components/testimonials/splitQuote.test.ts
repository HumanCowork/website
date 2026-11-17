/*
 * Tests for splitQuote.
 *
 * Run with: node --test src/components/testimonials/splitQuote.test.ts
 *
 * The project has no test runner configured, and adding one is a dependency
 * change nobody asked for. Node's own runner needs no dependency and no config,
 * and these cases have one right answer each, so it is enough. What it does not
 * give us is a browser: this file tests the split, and the split is the only part
 * of the testimonial row with behaviour. The layout is verified by looking at it.
 *
 * Every case asserts both halves, because the failure that matters is not "the
 * split did not happen" but "the split happened in the wrong place and silently
 * ate a word".
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { splitQuote } from './splitQuote.ts'

test('splits after the first sentence', () => {
  assert.deepEqual(
    splitQuote(
      'Human Cowork tiene una comunidad muy atractiva. Vine por un proyecto y me quedé por la gente.'
    ),
    {
      lead: 'Human Cowork tiene una comunidad muy atractiva.',
      rest: 'Vine por un proyecto y me quedé por la gente.',
    }
  )
})

test('a quote with no sentence end is all lead', () => {
  assert.deepEqual(splitQuote('Se trabaja distinto acá'), {
    lead: 'Se trabaja distinto acá',
    rest: '',
  })
})

test('a single sentence with its period leaves no rest', () => {
  assert.deepEqual(splitQuote('Es el lugar donde creció mi proyecto.'), {
    lead: 'Es el lugar donde creció mi proyecto.',
    rest: '',
  })
})

test('the question mark ends the lead, not a later period', () => {
  assert.deepEqual(splitQuote('¿Vale la pena? Sí, y mucho. Se nota en el día a día.'), {
    lead: '¿Vale la pena?',
    rest: 'Sí, y mucho. Se nota en el día a día.',
  })
})

test('an exclamation ends the lead', () => {
  assert.deepEqual(splitQuote('Acá se construye en serio! Y se nota.'), {
    lead: 'Acá se construye en serio!',
    rest: 'Y se nota.',
  })
})

test('a run of marks stays together in the lead', () => {
  assert.deepEqual(splitQuote('¿En serio?! Sí.'), {
    lead: '¿En serio?!',
    rest: 'Sí.',
  })
})

test('a closing quote belongs to the lead', () => {
  assert.deepEqual(splitQuote('Me dijo "venite". Y vine.'), {
    lead: 'Me dijo "venite".',
    rest: 'Y vine.',
  })
})

test('a closing parenthesis belongs to the lead', () => {
  assert.deepEqual(splitQuote('Llegué por una charla (la primera). Después me quedé.'), {
    lead: 'Llegué por una charla (la primera).',
    rest: 'Después me quedé.',
  })
})

test('a decimal does not split mid-number', () => {
  assert.deepEqual(splitQuote('Facturamos 1.5 millones el año pasado, y seguimos.'), {
    lead: 'Facturamos 1.5 millones el año pasado, y seguimos.',
    rest: '',
  })
})

test('a domain does not split mid-word', () => {
  assert.deepEqual(splitQuote('Todo empezó en human.cowork y terminó acá'), {
    lead: 'Todo empezó en human.cowork y terminó acá',
    rest: '',
  })
})

test('a period followed by a newline ends the lead', () => {
  assert.deepEqual(splitQuote('Primera linea.\nSegunda linea.'), {
    lead: 'Primera linea.',
    rest: 'Segunda linea.',
  })
})

test('surrounding whitespace is not part of either half', () => {
  assert.deepEqual(splitQuote('  Con espacios.  Y más.  '), {
    lead: 'Con espacios.',
    rest: 'Y más.',
  })
})

test('an empty quote yields two empty halves', () => {
  assert.deepEqual(splitQuote(''), { lead: '', rest: '' })
})

test('a quote of only whitespace yields two empty halves', () => {
  assert.deepEqual(splitQuote('   '), { lead: '', rest: '' })
})

test('no character of the quote is lost or duplicated', () => {
  const samples = [
    'Una. Dos. Tres.',
    '¿Pregunta? Respuesta.',
    'Sin punto final',
    'Me dijo "venite". Y vine.',
    'Facturamos 1.5 millones. Y crecimos.',
  ]

  for (const sample of samples) {
    const { lead, rest } = splitQuote(sample)
    const rejoined = rest === '' ? lead : `${lead} ${rest}`
    assert.equal(
      rejoined,
      sample.trim(),
      `the two halves must rebuild the original for: ${sample}`
    )
  }
})

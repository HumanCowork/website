/*
 * Tests for markEmphasis.
 *
 * Run with: node --test src/components/testimonials/markEmphasis.test.ts
 *
 * Same reasoning as splitQuote.test.ts: Node's runner, no dependency, and every
 * case has one right answer. The case that matters most is the last one -- the
 * words must come back in the order they were written, because the failure that
 * would reach a reader is emphasis landing on the wrong phrase, not emphasis
 * failing to appear.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { markEmphasis } from './markEmphasis.ts'

test('a quote with nothing picked out comes back as one plain run', () => {
  assert.deepEqual(markEmphasis('Una frase sin nada marcado.', []), [
    { text: 'Una frase sin nada marcado.', emphasis: false },
  ])
})

test('picks out a passage in the middle', () => {
  assert.deepEqual(markEmphasis('Vine por un proyecto y me quedé.', ['un proyecto']), [
    { text: 'Vine por ', emphasis: false },
    { text: 'un proyecto', emphasis: true },
    { text: ' y me quedé.', emphasis: false },
  ])
})

test('picks out a passage at the start', () => {
  assert.deepEqual(markEmphasis('Vine por un proyecto.', ['Vine']), [
    { text: 'Vine', emphasis: true },
    { text: ' por un proyecto.', emphasis: false },
  ])
})

test('picks out a passage at the end', () => {
  assert.deepEqual(markEmphasis('Vine por un proyecto.', ['proyecto.']), [
    { text: 'Vine por un ', emphasis: false },
    { text: 'proyecto.', emphasis: true },
  ])
})

test('two passages come back in the order they appear', () => {
  assert.deepEqual(
    markEmphasis('Vine por un proyecto y me quedé por la gente.', ['la gente', 'un proyecto']),
    [
      { text: 'Vine por ', emphasis: false },
      { text: 'un proyecto', emphasis: true },
      { text: ' y me quedé por ', emphasis: false },
      { text: 'la gente', emphasis: true },
      { text: '.', emphasis: false },
    ]
  )
})

test('a passage that is not in the quote is dropped, not guessed at', () => {
  assert.deepEqual(markEmphasis('Vine por un proyecto.', ['no existe']), [
    { text: 'Vine por un proyecto.', emphasis: false },
  ])
})

test('a longer passage wins over a shorter one inside it', () => {
  assert.deepEqual(
    markEmphasis('Un 60% más usuarios en tres meses.', ['más usuarios', 'Un 60% más usuarios']),
    [
      { text: 'Un 60% más usuarios', emphasis: true },
      { text: ' en tres meses.', emphasis: false },
    ]
  )
})

test('matching is literal: a passage in different case is a different passage', () => {
  assert.deepEqual(markEmphasis('Y sí, y sí.', ['y sí']), [
    { text: 'Y sí, ', emphasis: false },
    { text: 'y sí', emphasis: true },
    { text: '.', emphasis: false },
  ])
})

test('the same passage twice picks out only the first occurrence', () => {
  assert.deepEqual(markEmphasis('y sí, y sí.', ['y sí']), [
    { text: 'y sí', emphasis: true },
    { text: ', y sí.', emphasis: false },
  ])
})

test('an empty passage is ignored', () => {
  assert.deepEqual(markEmphasis('Una frase.', ['', '   ']), [
    { text: 'Una frase.', emphasis: false },
  ])
})

test('an empty quote yields nothing', () => {
  assert.deepEqual(markEmphasis('', ['algo']), [])
})

test('no character of the quote is lost, and none is duplicated', () => {
  const quote = 'Vine por un proyecto y me quedé por la gente.'
  const samples = [[], ['un proyecto'], ['la gente', 'un proyecto'], ['no existe', 'y me quedé']]

  for (const passages of samples) {
    const rejoined = markEmphasis(quote, passages)
      .map((segment) => segment.text)
      .join('')

    assert.equal(rejoined, quote, `the runs must rebuild the quote for: ${passages.join(', ')}`)
  }
})

import { describe, expect, it } from 'vitest';
import { culturalFacts } from './cultural-facts';
import { festivals, lessons, sourceById } from './content';
import { destinations } from './destinations';
import { curatedPhotos, photoForFestival, photoForLesson, photoForPlace } from './gallery';
import { createRounds, gameModes } from './quest-games';
describe('offline research pack',()=>{
  it('has at least 100 distinct, attributed readings with real related records',()=>{expect(culturalFacts.length).toBeGreaterThanOrEqual(100);expect(new Set(culturalFacts.map(fact=>fact.id)).size).toBe(culturalFacts.length);for(const fact of culturalFacts){expect(fact.explanation.length).toBeGreaterThan(50);expect(fact.sourceIds.every(id=>!!sourceById(id))).toBe(true);if(fact.lessonId)expect(lessons.some(lesson=>lesson.id===fact.lessonId)).toBe(true);if(fact.placeId)expect(destinations.some(place=>place.id===fact.placeId)).toBe(true);if(fact.festivalId)expect(festivals.some(festival=>festival.id===fact.festivalId)).toBe(true);}});
  it('provides every lesson, destination and festival with a matching local image or labeled guide',()=>{for(const lesson of lessons)expect(photoForLesson(lesson.id)?.src).toBeTruthy();for(const place of destinations)expect(photoForPlace(place.id)?.src).toBeTruthy();for(const festival of festivals)expect(photoForFestival(festival.id)?.src).toBeTruthy();expect(new Set(curatedPhotos.map(image=>image.id)).size).toBe(curatedPhotos.length);for(const image of curatedPhotos){expect(image.src).not.toMatch(/^https?:/);expect(image.credit).toBeTruthy();expect(image.alt).toBeTruthy();expect(image.source).toMatch(/^https:/);expect(image.license).toBeTruthy();expect(image.captureDate).toBeTruthy();expect(image.checkedAt).toBe('2026-10-17');expect(image.sourceIds.every(id=>!!sourceById(id))).toBe(true);}});
  it('has sources and resolvable local images for every game mode',()=>{for(const mode of gameModes)for(const round of createRounds(mode.id,'challenge')){expect(round.sourceIds.every(id=>!!sourceById(id))).toBe(true);for(const item of round.items)if(item.imageId)expect(curatedPhotos.some(image=>image.id===item.imageId)).toBe(true);}});
});

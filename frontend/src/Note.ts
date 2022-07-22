import { v4 as uuidv4 } from 'uuid'

export class Note {
  constructor(
    public readonly id: string = uuidv4(),
    public title: string = 'Untitled Note',
    public body: string = '',
    public lastModified: number = Date.now(),
  ) {}
}

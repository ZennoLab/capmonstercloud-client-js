import { Task } from './Task';

export function SerializeObject(options: { task?: Task; softId?: number; taskId?: number; clientKey: string }) {
  return { ...options };
}

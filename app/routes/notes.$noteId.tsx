import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link } from 'react-router-dom';
import { useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notes';

import styles from '~/styles/note-details.css';

export function meta({ data }: any) {
  return {
    title: data.title,
    description: 'Manage your notes with ease.',
  };
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function NoteDetails() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }: any) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note: { id: any }) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      { message: 'Could not find note for id: ' + noteId },
      { status: 404 }
    );
  }

  return selectedNote;
}

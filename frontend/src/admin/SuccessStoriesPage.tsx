import { useCallback, useEffect, useState } from "react";
import { api, errorMessage } from "./api";
import { usePageCrumb } from "./adminPage";
import type { PageProps } from "./adminPage";
import StoryForm from "./StoryForm";
import StoryList from "./StoryList";
import { LIST_HASH, emptyStory } from "./storyTypes";
import type { Note, Story } from "./storyTypes";
import "./SuccessStoriesPage.css";

/* #stories            -> listing
   #stories/new        -> add form
   #stories/edit/<id>  -> edit form        */

function NotFound({ onBack }: { onBack: () => void }) {
  usePageCrumb("Edit story");

  return (
    <div className="ss-card ss-empty">
      <p>That story could not be found. It may have been deleted.</p>
      <button type="button" className="ad-btn solid" onClick={onBack}>
        Back to the list
      </button>
    </div>
  );
}

export default function SuccessStoriesPage({ path }: PageProps) {
  const [stories, setStories] = useState<Story[] | null>(null);
  const [note, setNote] = useState<Note>(null);

  const load = useCallback(async () => {
    try {
      setStories(await api<Story[]>("/success-stories"));
    } catch (e) {
      setStories((current) => current ?? []);
      setNote({ ok: false, text: errorMessage(e) });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const isAdding = path[0] === "new";
  const editId = path[0] === "edit" ? path[1] : undefined;
  const inForm = isAdding || Boolean(editId);

  // Clear an old message when a form opens (the "saved" message must stay visible on the list).
  useEffect(() => {
    if (inForm) setNote(null);
  }, [inForm, editId]);

  const goToList = (message?: Note) => {
    if (message) setNote(message);
    window.location.hash = LIST_HASH;
  };

  if (isAdding) return <StoryForm key="new" initial={emptyStory()} reload={load} onDone={goToList} />;

  if (editId) {
    if (stories === null) {
      return (
        <p className="ad-sub" role="status">
          Loading…
        </p>
      );
    }

    const found = stories.find((story) => story._id === editId);
    if (!found) return <NotFound onBack={() => goToList()} />;

    return <StoryForm key={editId} initial={found} reload={load} onDone={goToList} />;
  }

  return <StoryList stories={stories} note={note} setNote={setNote} reload={load} />;
}
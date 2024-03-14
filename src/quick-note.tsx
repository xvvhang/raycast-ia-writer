import { useState } from "react";
import { Form, ActionPanel, Action, showHUD, showToast, closeMainWindow, popToRoot } from "@raycast/api";
import { defaultName } from "./preference";
import { write } from "./api";

export default function QuickNote() {
  const [name, setName] = useState(defaultName());
  const [text, setText] = useState(defaultText());

  function defaultText() {
    return name ? `# ${name}\n\n` : "";
  }

  function onSubmit(value: { name: string; text: string }) {
    write(value, onSaved);
  }

  async function onSaved(success: boolean, message?: string) {
    if (success) {
      await showHUD("Note Saved");
      await closeMainWindow();
      await popToRoot({ clearSearchBar: true });
    } else {
      await showToast({ title: "Failed to save note", message: message });
    }
  }

  function resetForm() {
    setName(defaultName());
    setText(defaultText());
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={onSubmit} />
          <Action title="Reset Form" onAction={resetForm}></Action>
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Filename" value={name} onChange={(name) => setName(name)} />
      <Form.TextArea id="text" title="Content" value={text} onChange={(text) => setText(text)} />
    </Form>
  );
}

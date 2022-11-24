import React from "react";
import { useGlobalContext } from "../../context";

export const IncompletePrompt = () => {
  const { setIncomplete, confirmIncomplete } = useGlobalContext();

  return (
    <div className="modal-overlay show-modal">
      <div className="incomplete-modal-container">
        <p>Incomplete habits. Confirm submission?</p>
        <div className="incomplete-button-div">
          <button
            className="incomplete-btn cancel"
            onClick={() => setIncomplete(false)}
          >
            Cancel
          </button>
          <button
            className="incomplete-btn confirm"
            onClick={() => confirmIncomplete()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

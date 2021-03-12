import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";

const ProfileInner = ({ form, decrypt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-inner-answers">
      {!isOpen ? (
        <FontAwesomeIcon
          icon={faChevronCircleDown}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <>
          <FontAwesomeIcon
            icon={faChevronCircleUp}
            onClick={() => setIsOpen(false)}
          />
          <div className="profile-inner-answer">
            {form.answers.map((answer) => {
              return (
                <div className="profile-answer">
                  <p className="profile-answer-body">
                    {decrypt[answer.name].body}
                  </p>
                  <p className="profile-answer-value">
                    {decrypt[answer.name][answer.num]}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileInner;

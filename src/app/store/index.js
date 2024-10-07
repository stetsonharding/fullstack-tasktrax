//provides state to application

import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import * as sagas from "./sagas";
import * as mutations from "./mutations";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(userSession = [] || {}, action) {
      let { type, authenticated, session } = action;
      //set session, groups, users, tasks to empty arrays
      // return userSession
      switch (type) {
        case mutations.SET_STATE:
          return { ...userSession, id: action.state.session.id };
        case mutations.REQUEST_AUTHENTICATE_USER:
          return { ...userSession, authenticated: mutations.AUTHENTICATED };
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return { ...userSession, authenticated };
        default:
          return userSession;
      }
    },
    tasks(tasks = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.tasks;
        case mutations.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskID,
              name: "New Task - Let's give it a name.",
              group: action.groupID,
              owner: action.ownerID,
              isComplete: false,
            },
          ];
        case mutations.SET_TASK_NAME:
          return tasks.map((task) => {
            return task.id === action.taskID
              ? { ...task, name: action.name }
              : task;
          });
        case mutations.SET_GROUP_NAME:
          return tasks.map((task) => {
            return task.id === action.taskID
              ? { ...task, group: action.groupID }
              : task;
          });
        case mutations.SET_DELETE_TASK:
          return tasks.filter((task) => {
            return task.id !== action.taskID;
          });
      }
      return tasks;
    },
    comments(comments = [], action) {
      console.log(action);
      switch (action.type) {
        case mutations.ADD_TASK_COMMENT:
          // Check if the comment for the task exists
          const existingCommentIndex = comments.findIndex(
            (comment) => comment.task === action.task
          );

          if (existingCommentIndex !== -1) {
            // If the comment exists, update it
            return comments.map((comment, index) =>
              index === existingCommentIndex
                ? { ...comment, content: action.content }
                : comment
            );
          } else {
            // If the comment doesn't exist, add it
            return [
              ...comments,
              { task: action.task, content: action.content },
            ];
          }

        case mutations.SET_STATE:
          // Directly set the state with the provided action state
          return action.state.comments;
        default:
          return comments;
      }
    },
    groups(groups = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.groups;
      }
      return groups;
    },
    users(users = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.users;
      }
      return users;
    },
  }),

  applyMiddleware(createLogger(), sagaMiddleware)
);

// Run each saga using Object.values to ensure all are run correctly
for (let saga of Object.values(sagas)) {
  sagaMiddleware.run(saga);
}

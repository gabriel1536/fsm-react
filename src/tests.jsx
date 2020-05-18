import React from "react";
import { appMachine } from "./machine";
import { createModel } from "@xstate/test";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { App } from "./App";

describe("FSM React test app", () => {
  const appModel = createModel(appMachine).withEvents({
    SUBMIT: {
      exec: async ({ getByTestId }, event) => {
        fireEvent.change(getByTestId("login-input"), {
          target: { value: event.value },
        });
        fireEvent.click(getByTestId("login-form"));
      },
      cases: [{ value: "someone" }, { value: "" }],
    },
    LOGOUT: ({ getByTestId }) => {
      fireEvent.click(getByTestId("button-logout"));
    },
  });
  const testPlans = appModel.getSimplePathPlans();
  
  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      afterEach(cleanup);
      plan.paths.forEach((path) => {
        it(path.description, () => {
          const rendered = render(<App />);
          return path.test(rendered);
        });
      });
    });
  });

  it("coverage", () => {
    appModel.testCoverage();
  });
});

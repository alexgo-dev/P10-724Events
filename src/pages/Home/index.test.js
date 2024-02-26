import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !", {}, { timeout: 3000 });
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    waitFor (() => {
      const eventListDisplayed = screen.getByTestId("events");
      expect(eventListDisplayed).toBeInTheDocument();
    });
  });
});

it("a list a people is displayed", () => {
  render(<Home />);
  waitFor(() => {
    const cardImageDisplayed = screen.getAllByTestId("PeopleCard-image-testid");
    expect(cardImageDisplayed.length).toBeGreaterThan(1);
  });
})

it("a footer is displayed", () => {
  render(<Home />);
  waitFor(() => {
    const footerDisplayed = screen.getByTestId("footer");
    expect(footerDisplayed).toBeInTheDocument();
  });
})

it("an event card, with the last event, is displayed", () => {
  render(<Home />);
  waitFor(() => {
    const cardDisplayed = screen.getByTestId("EventCard-testid");
    expect(cardDisplayed).toBeInTheDocument();
  });
})
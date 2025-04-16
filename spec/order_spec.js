import { Order } from '../Order.js';

describe("Tests all stages of a takeout order", function () {
    it("greets the user", function () {
        const oOrder = new Order("999-999-9999");
        const aResults = oOrder.handleInput("hello");
        expect(aResults[0]).toBe("Welcome to DreamBites Takeout.");
        expect(aResults[1]).toBe("Would you like to order a pizza or a burger?");
    });

    it("selects pizza and continues", function () {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        const aResults = oOrder.handleInput("pizza");
        expect(aResults[0]).toBe("Great choice! What size pizza would you like?");
    });

    it("selects size", function () {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        oOrder.handleInput("pizza");
        const aResults = oOrder.handleInput("large");
        expect(aResults[0]).toBe("What topping would you like? Pepperoni, mushroom, or veggie?");
    });

    it("selects topping", function () {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        oOrder.handleInput("pizza");
        oOrder.handleInput("medium");
        const aResults = oOrder.handleInput("pepperoni");
        expect(aResults[0]).toBe("Would you like to add a drink? Coke, Sprite, or Iced Tea?");
    });

    it("adds drink", function () {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        oOrder.handleInput("pizza");
        oOrder.handleInput("small");
        oOrder.handleInput("veggie");
        const aResults = oOrder.handleInput("sprite");
        expect(aResults[0]).toBe("Great! sprite added.");
        expect(aResults[1]).toContain("Your order: small pizza with veggie + sprite");
        expect(aResults[2]).toBe("Thanks for ordering from DreamBites!");
    });

    it("skips drink", function () {
        const oOrder = new Order("999-999-9999");
        oOrder.handleInput("hello");
        oOrder.handleInput("burger");
        oOrder.handleInput("double");
        oOrder.handleInput("bbq");
        const aResults = oOrder.handleInput("no");
        expect(aResults[0]).toBe("No drink added.");
        expect(aResults[1]).toContain("Your order: double burger with bbq");
        expect(aResults[2]).toBe("Thanks for ordering from DreamBites!");
    });
});

  
  
export class Order {
  constructor(sFrom) {
    this.OrderState = {
      WELCOMING: () => {
        let aReturn = [];
        this.stateCur = this.OrderState.ITEM;
        aReturn.push("Welcome to DreamBites Takeout.");
        aReturn.push("Would you like to order a pizza or a burger?");
        return aReturn;
      },

      ITEM: (sInput) => {
        let aReturn = [];
        const item = sInput.toLowerCase();
        if (item.includes("pizza") || item.includes("burger")) {
          this.item = item.includes("pizza") ? "pizza" : "burger";
          this.stateCur = this.OrderState.SIZE;
          aReturn.push(`Great choice! What size ${this.item} would you like?`);
        } else {
          aReturn.push("Please choose either pizza or burger.");
        }
        return aReturn;
      },

      SIZE: (sInput) => {
        let aReturn = [];
        const size = sInput.toLowerCase();
        const validSizes = this.item === "pizza" ? ["small", "medium", "large"] : ["single", "double"];
        if (validSizes.includes(size)) {
          this.size = size;
          this.stateCur = this.OrderState.OPTION;
          if (this.item === "pizza") {
            aReturn.push("What topping would you like? Pepperoni, mushroom, or veggie?");
          } else {
            aReturn.push("Which sauce would you like? Ketchup, mayo, or bbq?");
          }
        } else {
          aReturn.push(`Please select a valid size: ${validSizes.join(", ")}`);
        }
        return aReturn;
      },

      OPTION: (sInput) => {
        let aReturn = [];
        const option = sInput.toLowerCase();
        const validOptions = this.item === "pizza" ? ["pepperoni", "mushroom", "veggie"] : ["ketchup", "mayo", "bbq"];
        if (validOptions.includes(option)) {
          this.option = option;
          this.stateCur = this.OrderState.UPSELL;
          aReturn.push("Would you like to add a drink? Coke, Sprite, or Iced Tea?");
        } else {
          aReturn.push(`Please select a valid ${this.item === "pizza" ? "topping" : "sauce"}: ${validOptions.join(", ")}`);
        }
        return aReturn;
      },

      UPSELL: (sInput) => {
        let aReturn = [];
        const drink = sInput.toLowerCase();
        const validDrinks = ["coke", "sprite", "iced tea"];
        this.isDone = true;

        let summary = `Your order: ${this.size} ${this.item} with ${this.option}`;
        if (validDrinks.includes(drink)) {
          summary += ` + ${drink}`;
          aReturn.push(`Great! ${drink} added.`);
        } else {
          aReturn.push("No drink added.");
        }

        aReturn.push(summary);
        aReturn.push("Thanks for ordering from DreamBites!");
        return aReturn;
      }
    };

    this.stateCur = this.OrderState.WELCOMING;
    this.isDone = false;
    this.sFrom = sFrom;
  }

  handleInput(sInput) {
    return this.stateCur(sInput);
  }

  isDone() {
    return this.isDone;
  }
}

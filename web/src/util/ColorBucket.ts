import { SupplyData, Good } from "../domain";

function getClassNameFromQuantity(x: number, y: number, quantity: number) {
  if (quantity === 0) {
    return "inactive";
  } else if (quantity <= x) {
    return "red";
  } else if (quantity > x && quantity < y) {
    return "yellow";
  } else {
    return "green";
  }
}

function getStatusColorFromQuantity(x: number, y: number, quantity: number) {
  if (quantity === 0) {
    return "#ECEDF0";
  } else if (quantity <= x) {
    return "#f4bbbb";
  } else if (quantity > x && quantity <= y) {
    return "#ffec9b";
  } else {
    return "#6ce0ce";
  }
}

function getBoundsFromGood(good: Good) {
  switch (good) {
    case "Mascherina": {
      return { x: 100, y: 500 };
    }
    case "Guanti": {
      return { x: 500, y: 2000 };
    }
    case "Gel": {
      return { x: 50, y: 200 };
    }
    case "Termoscanner": {
      return { x: 5, y: 15 };
    }
  }
}

export function getColorFromBucket(props: SupplyData) {
  const { x, y } = getBoundsFromGood(props.good);
  return getStatusColorFromQuantity(x, y, props.quantity);
}

export function getColorClassNameFromBucket(props: SupplyData) {
  const { x, y } = getBoundsFromGood(props.good);
  return getClassNameFromQuantity(x, y, props.quantity);
}

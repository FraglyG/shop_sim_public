// ELEMENTS

const itemList = document.getElementById("item_list")! as HTMLDivElement;

// SITE FUNCTIONALITY

async function loadItemHtml(item: ShopItem) {
    const card = document.createElement('sl-card');
    const image = document.createElement('img');
    const strong = document.createElement('strong');
    const description = document.createElement('p');
    const small = document.createElement('small');
    const footer = document.createElement('div');
    const moreInfoButton = document.createElement('sl-button');
    const rating = document.createElement('sl-rating');

    card.classList.add('item_overview');
    image.slot = 'image';
    image.src = item.images[0];
    image.alt = "Image of the item";

    strong.classList.add("name");
    strong.textContent = item.name;

    description.classList.add("description");
    description.textContent = item.description;

    small.classList.add("stock");
    small.textContent = item.stock + " in stock";

    footer.slot = 'footer';
    (moreInfoButton as any).variant = 'primary';
    (moreInfoButton as any).pill = true;
    moreInfoButton.textContent = 'More Info';

    (rating as any).precision = 0.1;
    (rating as any).readonly = true;
    (rating as any).value = item.ratingAverage;

    card.appendChild(image);
    card.appendChild(strong);
    card.appendChild(description);
    card.appendChild(small);
    card.appendChild(footer);
    footer.appendChild(moreInfoButton);
    footer.appendChild(rating);

    moreInfoButton.addEventListener("click", () => {
        window.location.href = "/item/" + item.id;
    })

    return card;
}

async function stockItems() {
    itemList.innerHTML = "";

    const response = await fetch("/v1/api/item/list");
    const results = await response.json();

    if (!results.success) {
        itemList.innerHTML = "<p class='error'>Failed to load items :(</p>";
        return;
    }

    if (!results.items || results.items.length == 0) {
        itemList.innerHTML = "<p class='error'>No items found :( </p>";
        return;
    }

    for (const item of results.items) {
        const itemHtml = await loadItemHtml(item);
        itemList.appendChild(itemHtml);
    }

    console.log("Items loaded");
}

stockItems();
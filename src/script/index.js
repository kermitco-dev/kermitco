async function firebase_initialize() {
    console.log("firebase_initialize called.")
    if (!db) {
        firebase_loader_script = document.createElement("script");
        firebase_loader_script.src = "./lib/firebase.js";
        UIJS.getElement("#head").appendChild(firebase_loader_script);
    }
    
    if (!db.intialized) {
        await db.setup("kermitco")
        if (!db.initialized) console.error("error intializing firebase.");
        console.log("firebase_initialize status:" + db.initialized);
    } else {
        return;
    }
}

async function add_game_to_db(name, url, date_added) {
    if (!db || !db.initialize) firebase_initialize();
    let game_list = await db.get_from_db("games") || [];
    const game_object = {
        name: name,
        url: url,
    };
    game_list.append(game_object);
    await db.set_in_db("games", game_list);
}

async function bulk_add_games(list_games) {
    if (!db || !db.initialize) firebase_initialize();
    let game_list = await db.get_from_db("games") || [];
    for (let i = 0; i < list_games.length; i ++) {
        const game_object = {
            name: list_games[i].name,
            url: list_games[i].url
        };
        game_list.append(game_object);
    }
    await db.set_in_db("games", game_list);
}

async function clear_games() {
    await db.set_in_db("games", []);
}

async function remove_game_from_db(identifier, type) {
    if (!db || !db.initialize) firebase_initialize();
    let games_list = await db_get_from_db("games") || [];
    for (let i = 0; i < games_list.length; i ++) {
        if (type === "name" && games_list[i].name === identifier) {
            games_list.splice(i, 1);
        } else if (type === "url" && games_list[i].url === identifier) {
            games_list.splice(i, 1);
        }
    }
    await db.set_in_db("games", games_list);
}

// ONLOAD
document.addEventListener("DOMContentLoaded", function() {
    console.log("Onload triggered.");
    firebase_initialize();
});

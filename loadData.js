import Typesense from "typesense";
import books from "./books.json" assert { type: "json" };


(async () => {
    const TYPESENSE_CONFIG = {
        nodes: [
            {
                host: "r1bgv74pynw8t9zup-1.a1.typesense.net",
                port: "443",
                protocol: "https",
            },
        ],
        apiKey: "SREL1GtsYp3xaPlBSgdBAV9BiBnEsSb3",
    };

    //Created and instance of Typesense client
    const typesense = new Typesense.Client(TYPESENSE_CONFIG);
    // console.log(typesense);

    // Build Schema for books
    const schema = {
        name: "books",
        fields: [
            {
                facet: false,
                index: true,
                name: "title",
                optional: false,
                type: "string",
            },
            {
                facet: true,
                index: true,
                name: "authors",
                optional: false,
                type: "string[]",
            },
            {
                facet: true,
                index: true,
                name: "publication_year",
                optional: false,
                type: "int32",
            },
            {
                facet: false,
                index: true,
                name: "ratings_count",
                optional: false,
                type: "int32",
            },
            {
                facet: false,
                index: true,
                name: "average_rating",
                optional: false,
                type: "float",
            },
        ],
    };

    // Import collection json file
    // console.log(books);

    //Checks if the collection exists
    try {
        await typesense.collections("books").retrieve();
        console.log("Found existing collection of books");
    } catch (err) {
        console.error(err);
    }

    // Create collection schema
    await typesense.collections().create(schema);
    console.log("Creating schema...");

    //Upload collection json to Typesense Database
    try {
        const returnData = await typesense
            .collections("books")
            .documents()
            .import(books);
    } catch (err) {
        console.error(err);
    }
})();

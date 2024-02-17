import React from "react";
import {
    InstantSearch,
    SearchBox,
    Configure,
    Hits,
    Pagination,
} from "react-instantsearch-dom";

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
        nodes: [
            {
                host: import.meta.env.VITE_TYPESENSE_HOST,
                port: "443",
                protocol: "https",
            },
        ],
        apiKey: import.meta.env.VITE_TYPESENSE_APIKEY,
    },
    additionalSearchParameters: {
        query_by: "title",
    },
});

export default function App() {
    const Hit = ({ hit }) => {
        return (
            <div className="hit">
                <div className="hit-image">
                    <img alt={hit.authors} src={hit.image_url} />
                </div>
                <div className="hit-content">
                    <div className="hit-price">{hit.title}</div>
                </div>
            </div>
        );
    };
    return (
        <div>
            <h1>Search Books</h1>
            <InstantSearch
                indexName="books"
                searchClient={typesenseInstantsearchAdapter.searchClient}
            >
                <SearchBox autoFocus />
                <Configure hitsPerPage={5} />
                <Hits hitComponent={Hit} />
                <Pagination />
            </InstantSearch>
        </div>
    );
}

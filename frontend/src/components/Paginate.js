import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ page, pages, isAdmin = false, keyword = "" }) => {
    return (
        pages > 1 && (
            <Pagination className="d-flex justify-content-center">
                {[...Array(pages).keys()].map((p) => (
                    <LinkContainer
                        key={p + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${p + 1}`
                                    : `/page/${p + 1}`
                                : `/admin/productlist/${p + 1}`
                        }
                    >
                        <Pagination.Item
                            className="mx-1"
                            active={p + 1 === page}
                        >
                            {p + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;

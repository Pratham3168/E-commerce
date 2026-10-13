import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../../../components/product/ProductGrid";
import FilterGroup from "../../../components/common/FilterGroup";

export default function Products({ state }) {
  const catalog = state.products;
  const catalogCategories = state.categories;
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    () => searchParams.get("category") || "All products",
  );
  const [sort, setSort] = useState("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = useMemo(
    () =>
      catalog
        .filter(
          (product) =>
            (!search ||
              `${product.name} ${product.brand}`
                .toLowerCase()
                .includes(search.toLowerCase())) &&
            (category === "All products" || (typeof product.category === "object" ? product.category.name : product.category) === category),
        )
        .sort((a, b) =>
          sort === "Price: low to high"
            ? a.price - b.price
            : sort === "Price: high to low"
              ? b.price - a.price
              : 0,
        ),
    [catalog, search, category, sort],
  );
  return (
    <div className="page-shell listing-page">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Collection / 08 pieces</span>
          <h1>Shop all</h1>
          <p>Objects with a point of view, selected for the everyday.</p>
        </div>
        <button
          className="filter-toggle"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>
      <div className={`listing-layout ${filtersOpen ? "filters-visible" : ""}`}>
        <aside className="filter-panel">
          <div className="filter-head">
            <span className="eyebrow">Refine</span>
            <button
              className="mobile-close"
              onClick={() => setFiltersOpen(false)}
            >
              Close
            </button>
          </div>
          <label className="filter-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search objects"
            />
          </label>
          <FilterGroup title="Category">
            <button
              className={category === "All products" ? "selected" : ""}
              onClick={() => setCategory("All products")}
            >
              All products <small>{catalog.length}</small>
            </button>
            {catalogCategories.map((item) => (
              <button
                className={category === item.name ? "selected" : ""}
                onClick={() => setCategory(item.name)}
                key={item.name}
              >
                {item.name}
                <small>{item.count || 0}</small>
              </button>
            ))}
          </FilterGroup>
          <FilterGroup title="Price">
            <label className="check-row">
              <input type="checkbox" /> Under $50
            </label>
            <label className="check-row">
              <input type="checkbox" /> $50 - $150
            </label>
            <label className="check-row">
              <input type="checkbox" /> Over $150
            </label>
          </FilterGroup>
          <FilterGroup title="Availability">
            <label className="check-row">
              <input type="checkbox" /> In stock only
            </label>
          </FilterGroup>
        </aside>
        <section className="listing-content">
          <div className="listing-toolbar">
            <span>{filtered.length} results</span>
            <label className="sort-select">
              Sort by{" "}
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option>Featured</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
          <ProductGrid
            products={filtered}
            likedIds={state.wishlist}
            onLike={state.toggleWishlist}
            onAdd={state.addToCart}
          />
        </section>
      </div>
    </div>
  );
}

import './searchBar.css'

function SearchBar(){
    return(
        <div id="searchBarForm">
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group" id="searchBar">
                <input type="text" className="form-control bg-light border-0 small"
                    placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                </input>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </form>
        </div>
    )
}

export default SearchBar
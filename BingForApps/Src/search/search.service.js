app.service("searchService", function ($http) {
    this.getSearchResults = function (searchQuery) {
       // return $http.post("/api/Values/" + searchString);
        return $http.post("/api/Values/" ,  searchQuery );
	}
});
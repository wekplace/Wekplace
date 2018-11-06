* With regards to the controllers and their helper functions
    If no queryString is provided for the filter, then the filter argument would be used to make the db Operation.

* updateSingle, unlike the other controllers needs an array of objects to operate. 
    eg) [
            {"propName": "Name", "Value": "value"},
            {"propName": "Name", "Value": "value"},
        ]
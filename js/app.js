    
    
        // Vars
		var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
        var myHeaders = {
        'X-Client-Id': '3519',
        'X-Auth-Token': '24c31d181777d61db46ede0c65399590'         
        };

        $.ajaxSetup({
            headers: myHeaders
        });
        /*
        */ 
        //Function for generate mustache template from html code, and add this to box (<div> etc. html element ).
        function generateTemplate(name, data, basicElement) {
            var template = document.getElementById(name).innerHTML;
            var element = document.createElement(basicElement || 'div'); // Create random div
    
            Mustache.parse(template);
            element.innerHTML = Mustache.render(template, data);   

            return element;      
        }     

        // Fetch API
        fetch(proxyUrl + baseUrl + '/board', { headers: myHeaders }) //ADD v2
            .then(function(resp) {
                return resp.json();
            })
            .then(function(resp) {
                setupColumns(resp.columns);
        });

        // Func for create column and ADD to board onject. ADD v2
        function setupColumns(columns) {
            columns.forEach(function(column) {
                var col = new Column(column.id, column.name);
                board.addColumn(col);
                setupCards(col, column.cards);
            });
        }

        //Function for setup carts in columns. ADD v2
        function setupCards(col, cards) {
            cards.forEach(function (card) {
                var cardObj = new Card(card.id, card.name);
                col.addCard(cardObj);
            });
        }


        
        
    
    
   
    
    
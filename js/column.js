
    
        //Class name write with large letter!
        // Column class
        function Column(id, name) {
            var self = this;
    
            this.id = id;  //Change v2
            this.name = name || 'No name given'; //Change v2
            this.element = generateTemplate('column-template', { name: this.name, id: this.id });
    
            // Delete or add kolumn
            this.element.querySelector('.column').addEventListener('click', function (event) {
                if (event.target.classList.contains('btn-delete')) {
                  self.removeColumn();
                }
              
                if (event.target.classList.contains('add-card')) { //Many changes v2
                    var cardName = prompt("Enter the name of the card");  
                    var data = new FormData();

                    data.append('name', cardName);
                    data.append('bootcamp_kanban_column_id', self.id);

                    event.preventDefault();

                    if (cardName != '' && cardName != null && cardName != isNaN) {
                        
                        fetch(baseUrl + '/card', {
                            method: 'POST',
                            headers: myHeaders,
                            body: data
                        })
                        .then(function(resp) {
                            return resp.json();
                        })
                        .then(function(resp) {
                            var card = new Card(resp.id, cardName);
                            self.addCard(card);
                        });
                    }

                    //self.addCard(new Card(cardName));
                }
            });
        }
    
        // Methods for Column Class
        Column.prototype = {
            addCard: function(card) {
                this.element.querySelector('ul').appendChild(card.element);
            },
            removeColumn: function() {  //Many changes v2!
                var self = this; // Add v2

                fetch(baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
                    .then(function(resp) {
                        return resp.json();
                    })
                    .then(function(resp) {
                        self.element.parentNode.removeChild(self.element);
                    });
            }
        };

    
        //Class name write with large letter!
        // Column class
        function Column(name) {
            var self = this;
    
            this.id = randomString();
            this.name = name;
            this.element = generateTemplate('column-template', { name: this.name, id: this.id });
    
            // Delete or add kolumn
            this.element.querySelector('.column').addEventListener('click', function (event) {
                if (event.target.classList.contains('btn-delete')) {
                  self.removeColumn();
                }
              
                if (event.target.classList.contains('add-card')) {
                  self.addCard(new Card(prompt("Enter the name of the card")));
                }
              });
        }
    
        // Methods for Column Class
        Column.prototype = {
            addCard: function(card) {
              this.element.querySelector('ul').appendChild(card.element);
            },
            removeColumn: function() {
              this.element.parentNode.removeChild(this.element);
            }
        };
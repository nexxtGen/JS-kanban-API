    
        //Card class 
        function Card(id, name) {
            var self = this;

            this.id = id; 
            this.name = name || 'No name given';
            this.element = generateTemplate('card-template', { description: this.name, id: this.id }, 'li');
    
            //delete Card
            this.element.querySelector('.card').addEventListener('click', function (event) {
                event.stopPropagation();
              
                if (event.target.classList.contains('btn-delete')) {
                  self.removeCard();
                  event.preventDefault();
                } else if (event.target.classList.contains('btn-edit-card')) {
                  var newCardName = prompt("Enter the name of the card");
                  self.editCard(newCardName);
                  event.preventDefault();
                }
              });
            
          }
    
          // delete card method
        Card.prototype = {
            removeCard: function() {
                var self = this;
                              
                fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
                  .then(function(resp) {
                    return resp.json();
                  })
                  .then(function(resp) {
                    self.element.parentNode.removeChild(self.element);
                  })
            },
            //Method to edit card
            editCard: function(name) {
              const self = this;              
              const nameCardEdited = name;
              const columnIdEditCard = $("div"+"#"+self.id).closest("ul" ).attr( "id");
              console.log('Id columny w func edit card', columnIdEditCard);             

              $.ajax({
                url: baseUrl + '/card/' + self.id,
                data: {
                      id: self.id,
                      name: nameCardEdited,
                      bootcamp_kanban_column_id: columnIdEditCard
                },
                method: 'PUT',
                success: function(response) {
                  //var self2 = this;
                  $('#'+self.id).find(".card-description").text(nameCardEdited);
                  //console.log('test 2', $('.card-description '+'#'+supportId).text(nameCardEdited));
                  //$('.card-description #'+self.id).text(nameCardEdited);
                  //var toDomEdit = $('.card-description').closest(self.element);
                  //toDomEdit.text(nameCardEdited);
                  //console.log('Odp serva:', response);
                }
              });  

              /* kurwa
              var dataEditColumn = new FormData();
              dataEditColumn.append('id', self.id);
              dataEditColumn.append('name', nameCardEdited);
              dataEditColumn.append('bootcamp_kanban_column_id', columnIdEditCard );

              fetch(baseUrl + '/card/' + self.id, {
                method: 'PUT',
                headers: myHeaders,
                body: dataEditColumn
              })
              .then(function(resp) {
                return resp.json();
              }) */
            }
        }
    
        
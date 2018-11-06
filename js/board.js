          // Create board Object

        var board = {
            name: 'Kanban Board',
            element: document.querySelector('#board .column-container'),
            addColumn: function(column) {
              this.element.appendChild(column.element);
              initSortable(column.id); // for card sort
            },            
        };

          // Add listener to button. This create new column object in board.
          document.querySelector('#board .create-column').addEventListener('click', function() {
            var name = prompt('Enter a column name');
            var data = new FormData();
          
            data.append('name', name);

            if (name != '' && name != null && name != isNaN) {
              
                fetch(baseUrl + '/column', {
                  method: 'POST',
                  headers: myHeaders,
                  body: data
                })
                
                .then(function(resp) {
                  return resp.json();
                })
                
                .then(function(resp) {
                  var column = new Column(resp.id, name);
                  board.addColumn(column);
                });
            }
          });

        // Drag & Drop function for sort columns, cards.
        function initSortable(idColumn) {

            var el = document.getElementById(idColumn);
            Sortable.create(el, {
                group: 'kanban-cards',
                sort: true,
                onAdd: function(evt) {
                  //Szukam Id przenoszonej karty z drzewie DOM 3
                  var cardItemElement = evt.item;
                  var cardDivTarget = cardItemElement.querySelector(".card");
                  var cardId = parseInt(cardDivTarget.getAttribute('id'));
                  //console.log('Czy to moje id karty?', typeof cardId);

                  //Szukam i przypisuję do zmiennej wartość description przenoszonej karty
                  var cardTextTarget = cardItemElement.querySelector(".card-description");
                  //console.log('card desc test:', cardTextTarget);
                  var cardText = cardTextTarget.innerHTML;
                  //console.log('card text:', typeof cardText);

                  //Szukam i przypisuję wartosć Id kolumny do której karta została przeniesiona                  
                  var columnId = parseInt(evt.to.id);    
                  var columnIdInt = parseInt(columnId);
                  // Dodanie zmian w sortowaniu do godzilla REST API
                  let data = new FormData();                  
                  data.append('id', cardId);  
                  data.append('name', cardText);                      
                  data.append('bootcamp_kanban_column_id', columnIdInt); 

                  // Działa                  
                  $.ajax({
                    url: baseUrl + '/card/' + cardId,
                    data: {
                          id: cardId,
                          name: cardText,
                          bootcamp_kanban_column_id: columnIdInt
                    },
                    method: 'PUT',
                    success: function(response) {
                      console.log('Odp serva:',response);
                    }
                  });  

                  //Nie działa                  
                  /*
                  fetch(`${baseUrl}/card/${cardId}`, { 
                      method: 'PUT',                                                                 
                      headers: myHeaders, 
                      body: data
                  })
                  .then(response => console.log('Odp z serva:', response.json()))                  
                  });
                  */                              
                  
                  
                 /*
                  if (cardText != '') {
                    axios.put( `${baseUrl}/card/${cardId}`, { 
                      id: cardId,
                      name: cardText,
                      bootcamp_kanban_column_id: columnIdInt                        
                          // id: cardId, name: cardText, bootcamp_kanban_column_id: evt.to.id  
                    }, myHeaders)
                    .then(function (response) {
                      console.log('respo serwer:', response);
                    });
                  }
                  */
                  // testy sortable API
                  //console.log('itemEL', cardItemElement);  // dragged HTMLElement
                  //console.log('Sortuje z: ', evt.from );
                  //console.log('Sortuje do: ', evt.to );  
                }              
            });
        }    




        // Add function: sortable columns  
        /*      
        Sortable.create(board.element, {
          group: 'kanban-columns',
          sort: true
        });

        */
        
    
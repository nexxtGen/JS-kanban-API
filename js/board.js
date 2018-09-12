  
        // Create board Object
    
        var board = {
            name: 'Kanban Board',
            element: document.querySelector('#board .column-container'),
            addColumn: function(column) {
              this.element.appendChild(column.element);
              initSortable(column.id); 
            },            
        };

          // Add listener to button. This create new column object in board.
          document.querySelector('#board .create-column').addEventListener('click', function() {
            var name = prompt('Enter a column name');
            var data = new FormData();
          
            data.append('name', name);
          
            fetch(baseUrl + '/column', {
                method: 'POST',
                headers: myHeaders,
                body: data,
              })
              .then(function(resp) {
                return resp.json();
              })
              .then(function(resp) {
                var column = new Column(resp.id, name);
                board.addColumn(column);
              });
          });

        // Drag & Drop function for sort columns, cards.
        function initSortable(id) {
            var el = document.getElementById(id);
            var sortable = Sortable.create(el, {
                group: 'kanban-cards',
                sort: true
            });
        }    

        // Add function: sortable columns        
        Sortable.create(board.element, {
			group: 'kanban-columns',
			sort: true
        });
        
    
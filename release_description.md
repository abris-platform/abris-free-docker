# Release version: 3.3 
## Description
### User Interface:
##### Changes:
- Table form new management tools;
- Introduce new graphical structure;
- Display format of icons;
- Data editing process;
- Introduce config viewmodel;
- Start install page and form redesign;
- Support typeCast from widgets;
- Forgot password hint;
- Markup improvements;
- General improvements.
##### Fixes:
- Graphical control elements;
- System data types;
- CSS classes for icons;
- Adding tree elements;
- Virtual data structures;
- Table row visibility;
- Fixes for other browsers;
- Displaying a tree segment;
- Date & Time pickers;
- General elements changes;
- Layout fixes.
### Abris:
- Change login function calling;
- Reducing build timeout;
- Change tests screensize and move its call;
- Remove abris project recursion;
- Fine tuning the pipeline.
### Database:
##### Changes:
- Add the ability to set the size of types inside an array;
- Change the list of types that have size: remove the "char" type;
- Add the ability to set different read only rules for projections;
- Change Read-only mode to Edit mode for projection_entity;
- Add functions for converting file data;
- Change pg_extension_config_dump parameters.
##### Fixes:
- Fix an error messages;
- Fix a name of the menu item created from the scheme;
- Fix the display of temporary schemes;
- Fix additional parameters for Edit mode of projection_entity;
- Fix view_projection_entity for using Edit mode;
- Fix the contents of the "meta" menu;
- Fix the "clean" function.
### Server:
- Fix count on distinct fields;
- Fix array EQ operation;
- NEQ condition for array operand;
- Test coverage;
- Fix currentKey for constracted tables;
- Fix currentRow ordering;
- Add format method for subfields;
- Add type confersion parameter for fields;
- Fix https ckeck;
- Support query preprocessing;
- More preprocessing events;
- Fix preProcessing params;
_____
# Release version: 3.2 
## Description
### User Interface:
##### Changes:
- Completely redesigned user interface;
- Separator for visual forms;
- Improved notifications;
- Additional localization;
- Interactive help section;
- Markup improvements;
- General improvements.
##### Fixes:
- Language selector;
- Search field;
- Focus trouble;
- Filter popup form;
- Displaying a tree segment;
- Displaying main menu items;
- Date & Time pickers;
- General elements changes;
- Color themes;
- Layout fixes.
### Abris:
- Separate instance for testing;
- Reworking tests for a new design;
- Fine tuning the pipeline.
### Database:
##### Changes:
- Add function to automatically set primary keys for view;
- Function create_menu ignores tables with multiple keys;
- Changing the setting of primary keys;
- Composite primary key support;
- Add function to create a copy of projection;
- Add help table and view;
- Add function to replace a projection properties;
- Some changes to create and update virtual projection_property;
- Change the message for exception PA023;
- Add relation for type of display and data type;
- Add composite types and arrays into column_type.
##### Fixes:
- Fix consuming a lot of RAM during installation;
- Fix menu for main projections;
- Some changes for projection_entity trigger;
- Fix empty table_type;
- Fix update of projection name for projection_entity;
- Fix replacing projection property up;
- Fix setting jump when update projection name.
### Server:
- Updates submodules;
- Setting custom configs;
- Mailing list fixes;
_____
<script src="http://cdn.datatables.net/1.10.4/js/jquery.dataTables.js" type="text/javascript"></script>

jQuery(document).ready(function() {
  var dataObject = {
    columns: [{
      title: "TITLE"
    }, {
      title: "DESCRIPTION"
    }, {
      title: "PUBLISHER"
    }, {
      title: "PLATFORM"
    }, {
      title: "PRICE"
    }],
    data: [
      ["Super Mario Odyssey", "Join Mario on a massive, globe-trotting 3D adventure", "Nintendo", "Nintendo Switch", 49.99],
      ["Fortnite", "The Agency is calling, will you join the fight?", "Epic Games", "PlayStation", 58.99],
      ["FIFA 20", "Authentic soccer experience", "Electronic Arts", "PlayStation", 39.99],
      ["Donkey Kong", "Arctic invaders have turned Donkey Kong Island into their personal frozen fortress, and it’s up to you to save the day", "Nintendo", "Nintendo Switch", 59.99],
      ["Minecraft", "Explore a blocky, procedurally-generated 3D world", "Mojang", "XBox", 19.99],
      ["Grand Theft Auto V", "Follow criminals and their efforts to commit heists while under pressure from a government agency", "Rockstar Games", "XBox", 9.99]
    ]
  };
  var columns = [];
  $('#gameTable').dataTable({
    "data": dataObject.data,
    "columns": dataObject.columns
  });
});

<table cellpadding="0" cellspacing="0" border="0" class="display" id="gameTable">
    <tr><thead>column1</thead></tr>
    <tbody></tbody>
</table>
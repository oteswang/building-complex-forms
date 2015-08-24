Template.contactInformation.helpers({
  contactInformation: function() {
    var getCustomer = Customers.findOne( { "userId": Meteor.userId() } );

    if ( getCustomer ) {
      return getCustomer;
    }
  }
});

Template.contactInformation.events({
  'submit form': function( event, template ) {
    event.preventDefault();

    var customer = {
      name: template.find( "[name='name']" ).value,
      telephone: template.find( "[name='telephone']" ).value,
      streetAddress: template.find( "[name='streetAddress']" ).value,
      secondaryAddress: template.find( "[name='secondaryAddress']" ).value,
      city: template.find( "[name='city']" ).value,
      state: template.find( "[name='state']" ).value,
      zipCode: template.find( "[name='zipCode']" ).value,
      userId: this.userId
    };

    Meteor.call( 'updateCustomer', customer, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Contact information updated!", "success" );
      }
    });
  }
});

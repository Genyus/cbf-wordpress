// An array of the clients/tabs using this worker.
var clients         = [];
var pusher          = false;
var channels        = [];
var current_user_id = 0;

/**
 * Receive all messages from client.
 */
function onMessage( e ) {
	switch ( e.data.type ) {
		case 'pusher_init':
			pusherInit( e.data );
			break;
		case 'pusher_subscribe':
			pusherSubscribe( e.data );
			break;
		case 'pusher_unsubscribe':
			pusherUnsubscribe( e.data );
			break;
		case 'pusher_send_event':
			pusherChannelTrigger( e.data );
			break;

		default:
			sendMessages( e.data.type, e.data );
			break;
	}
}

/**
 * Init the pusher.
 *
 * @param {*} d
 */
function pusherInit( d ) {
	var options = d.data.options;

	if ( ! pusher || current_user_id !== d.loggedin_user_id ) {
		current_user_id = d.current_user_id;
		importScripts( 'https://js.pusher.com/7.0/pusher.worker.min.js' ); // jshint ignore:line
		importScripts( options.authorizer ); // jshint ignore:line
		options.authorizer = PusherBatchAuthorizer; // jshint ignore:line
		pusher             = new Pusher( d.data.app_key, options ); // jshint ignore:line
		sendMessages( 'pusher_init_first', { success: true } );
	}
	sendMessages( 'pusher_init', { success: true } );
	send_channels();
	return pusher;
}

/**
 * Send channels to clients.
 * It will send all channels to client.
 * It will be used in the bb-shared-worker-wrapper.js
 */
function send_channels() {
	sendMessages( 'pusher_channels', { channels: pusher.channels } );
}

/**
 * Pusher channel subscribe and bind events.
 * It will be used in the bb-shared-worker-wrapper.js
 *
 * @param {*} d
 */
function pusherSubscribe( d ) {

	if ( current_user_id !== d.current_user_id ) {
		return;
	}

	if ( 'undefined' === typeof channels[d.data.channel_name] ) {
		channels[d.data.channel_name] = pusher.subscribe( d.data.channel_name );
		// Bind Global Events in This Channel.
		channels[d.data.channel_name].bind_global(
			function ( event, data ) {
				// notify all workers.
				sendMessages(
					'pusher_event',
					{
						channel_name: d.data.channel_name,
						event       : event,
						data        : data,
						user_id     : current_user_id,
					}
				);
			}
		);

	}
}

/**
 * Channel Pusher UnSubscribe.
 *
 * @param {*} d
 */
function pusherUnsubscribe( d ) {

	if ( current_user_id !== d.current_user_id ) {
		return;
	}
	if ( 'undefined' !== typeof channels[d.data.channel_name] ) {
		pusher.unsubscribe( d.data.channel_name );
	}
}

/**
 * Function to send event to channel.
 *
 * @param {*} d
 */
function pusherChannelTrigger( d ) {

	if ( current_user_id !== d.current_user_id ) {
		return;
	}
	if ( 'undefined' !== typeof channels[d.data.channel_name] ) {
		channels[d.data.channel_name].trigger( d.data.event, d.data.data );
	}
}

/**
 * Send Messages to all Client.
 * It will be listened into the bb-shared-worker-wrapper.js file.
 *
 * @param {*} type
 * @param {*} data
 */
function sendMessages( type, data ) {
	clients.forEach(
		function ( client ) {
			client.postMessage(
				{
					type: type,
					data: data,
				}
			);
		}
	);
}

/**
 * Listener to when ever a client is connected.
 *
 * @param {*} evt
 */
self.addEventListener( // jshint ignore:line
	'connect',
	function ( evt ) {
		// Add the port to the list of connected clients.
		var port = evt.ports[0];
		clients.push( port );
		port.onmessage = onMessage;
		// Start the worker.
		port.start();
	}
);

/*
 * simpleLastFM
 * 
 * A simple jQuery plugin to display what you've been
 * listening and scrobbling to Last.fm including
 * recent tracks, top albums, weekly charts and plenty more.
 *
 * Developed by James Fleeting <hello@jamesfleeting.com>
 * Another project from monkeeCreate <http://monkeecreate.com>
 *
 * Version 1.0 - Last updated: May 19 2011
 */

(function($) {
	$.extend({
		simpleLastFM: function(options){		
			var options = $.extend({
				apikey: '', //Get it at http://www.last.fm/api/account
				username: '',
				method: 'getRecentTracks', //Options: getRecentTracks, getTopAlbums, getTopArtists, getTopTracks, getLovedTracks, getWeeklyAlbumChart, getWeeklyArtistChart, getWeeklyTrackChart
				limit: 9, //Max is 200
				success: function(response){},
				error: function(message){}
			}, options);
			
			if(options.apikey == '') {
				options.error("No API Key was found.");
				return false;
			}
			
			if(options.username == '') {
				options.error("No username was provided.");
				return false;
			}
			
			var apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=user.'+options.method+'&user='+options.username+'&limit='+options.limit+'&api_key='+options.apikey+'&format=json&callback=?';
						
			$.getJSON(
				apiUrl,
				function(data) {
					if(data != null && data != '') {						
						if(options.method == "getRecentTracks") {
							var tracks = [];
							
							$(data.recenttracks.track).each(function() {								
								var track = {
									artist: {
										name: this.artist['#text'],
										mbid: this.artist.mbid
									},
									name: this.name,
									link: this.url,
									album: {
										name: this.album['#text'],
										mbid: this.album.mbid
									},
									image: {
										small: this.image[0]['#text'],
										medium: this.image[1]['#text'],
										large: this.image[2]['#text'],
										extralarge: this.image[3]['#text']
									},
									streamable: this.streamable
								}
								
								tracks[tracks.length] = track;	
							});
							
							var data = tracks;
						} else if(options.method == "getTopAlbums") {
							var albums = [];
							
							$(data.topalbums.album).each(function() {								
								var album = {
									name: this.name,
									mbid: this.mbid,
									playcount: this.playcount,
									link: this.url,
									artist: {
										name: this.artist.name,
										mbid: this.artist.mbid,
										link: this.artist.url
									},
									image: {
										small: this.image[0]['#text'],
										medium: this.image[1]['#text'],
										large: this.image[2]['#text'],
										extralarge: this.image[3]['#text']
									}
								}
								
								albums[albums.length] = album;	
							});
							
							var data = albums;
						} else if(options.method == "getTopArtists") {
							var artists = [];
							
							$(data.topartists.artist).each(function() {								
								var artist = {
									name: this.name,
									mbid: this.mbid,
									playcount: this.playcount,
									link: this.url,
									streamable: this.streamable,
									image: {
										small: this.image[0]['#text'],
										medium: this.image[1]['#text'],
										large: this.image[2]['#text'],
										extralarge: this.image[3]['#text']
									}
								}

								artists[artists.length] = artist;	
							});
								
							var data = artists;
						} else if(options.method == "getTopTracks") {
							var tracks = [];
							
							$(data.toptracks.track).each(function() {								
								var track = {
									name: this.name,
									duration: this.duration,
									mbid: this.mbid,
									playcount: this.playcount,
									link: this.url,
									streamable: this.streamable['#text'],
									artist: {
										name: this.artist.name,
										mbid: this.artist.mbid,
										link: this.artist.url
									},
									image: {
										small: this.image[0]['#text'],
										medium: this.image[1]['#text'],
										large: this.image[2]['#text'],
										extralarge: this.image[3]['#text']
									}
								}

								tracks[tracks.length] = track;	
							});
							
							var data = tracks;
						} else if(options.method == "getLovedTracks") {
							var tracks = [];
							
							$(data.lovedtracks.track).each(function() {								
								var track = {
									name: this.name,
									mbid: this.mbid,
									date: this.date['#text'],
									link: this.url,
									streamable: this.streamable['#text'],
									artist: {
										name: this.artist.name,
										mbid: this.artist.mbid,
										link: this.artist.url
									},
									image: {
										small: this.image[0]['#text'],
										medium: this.image[1]['#text'],
										large: this.image[2]['#text'],
										extralarge: this.image[3]['#text']
									}
								}

								tracks[tracks.length] = track;	
							});							
							
							var data = tracks;
						} else if(options.method == "getWeeklyAlbumChart") {
							var albums = [];
							/*
								TODO Add From & To Dates
							*/
							$(data.weeklyalbumchart.album).each(function() {								
								var album = {
									name: this.name,
									mbid: this.mbid,
									playcount: this.playcount,
									link: this.url,
									artist: {
										name: this.artist['#text'],
										mbid: this.artist.mbid,
									}
								}

								albums[albums.length] = album;	
							});
							
							var data = albums;
						} else if(options.method == "getWeeklyArtistChart") {
							var artists = [];
							/*
								TODO Add From & To Dates
							*/
							$(data.weeklyartistchart.artist).each(function() {								
								var artist = {
									name: this.name,
									mbid: this.mbid,
									playcount: this.playcount,
									link: this.url
								}

								artists[artists.length] = artist;	
							});
							
							var data = artists;
						} else if(options.method == "getWeeklyTrackChart") {
							var tracks = [];
							/*
								TODO Add From & To Dates
							*/
							$(data.weeklytrackchart.track).each(function() {								
								var artist = {
									name: this.name,
									mbid: this.mbid,
									playcount: this.playcount,
									link: this.url,
									artist: {
										name: this.artist['#text'],
										mbid: this.artist.mbid,
									},
									image: {
										small: this.image[0]['#text'],
										medium: this.image[1]['#text'],
										large: this.image[2]['#text']
									}
								}

								tracks[tracks.length] = track;	
							});
							
							var data = tracks;
						}
						
						options.success(data);
					} else {
						options.error("There was an error. Please try again.");
					}
				}
			);
			return this;
		}		
	});
})(jQuery);
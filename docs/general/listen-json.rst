********************
The listen.json file
********************

The ``listen.json`` file, located at ``/usr/prefs/listen.json`` determines which listening addresses Aluminum uses for different features. The file contains a single ``listenAddresses`` object, described below.

A default configuration of ``listen.json`` is located at ``/defaults/prefs/listen.json``.

.. json:object:: listenAddresses

   :property wire: Listening address for Aluminum Wire
   :proptype wire: :json:object:`wirePorts`

.. json:object:: wirePorts

   :property String HTTP: Port to use for Aluminum Wire over HTTP
   :property String HTTPS: Port to use for Aluminum Wire over HTTPS

        .. warning:: Wire does not yet support HTTPS.

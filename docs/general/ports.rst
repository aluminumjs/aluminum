*******************
The ports.json file
*******************

The ``ports.json`` file, located at ``/prefs/ports.json`` determines which ports Aluminum uses for different features. The file contains a single ``aluminumPorts`` object, described below.

A default configuration of ``ports.json`` is located at ``/defaults/prefs/ports.json``.

.. json:object:: aluminumPorts

   :property wire: Ports for Aluminum Wire
   :proptype wire: :json:object:`wirePorts`

.. json:object:: wirePorts

   :property Number HTTP: Port to use for Aluminum Wire over HTTP
   :property Number HTTPS: Port to use for Aluminum Wire over HTTPS

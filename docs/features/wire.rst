*************
Aluminum Wire
*************

    Aluminum Wire is a highly-customizable and extensible static file server that also includes support for dynamic files (using both Node.js and PHP).

.. note:: Dynamic file support is not yet available

Configuration
=============

The configuration file for Aluminum Wire is read from ``/usr/prefs/wire.json``. The supported configuration options are described below.

.. json:object:: wireConfig

    :property String protocol: The protocol for Wire to use, either ``http`` or ``https``

        .. note:: ``protocol`` is not yet implemented.

    :property Boolean indexRedirect: Whether to respond to requests for a directory by serving the ``index.html`` file in that directory (if it exists; otherwise, a 404 response code will be served)
    :property errorPages: Configuration options for the error pages served by Wire
    :proptype errorPages: :json:object:`wireErrPgs`

.. json:object:: wireErrPages

    :property notFound: Describes the page that Wire should serve if a resource cannot be found
    :proptype notFound: :json:object:`errPageConf`
    :property serverError: Describes the page that Wire should serve in the event of an internal server error
    :proptype serverError: :json:object:`errPageConf`

.. json:object:: errPageConf

    :property String URI: The URI of the file to serve, given relative to ``/src/wire/main.js``
    :property String encoding: The encoding of the file to serve. If the MIME type that corresponds to ``URI`` is not ``text``, this property will be ignored.

Serving Files
=============

Wire serves files from ``/usr/resources/wire/serve/``.

Client Cache Support
--------------------

When Wire serves a static file, it retrieves the date that the file was last modified and sends this information in the ``Last-Modified`` HTTP header.

Wire automatically reads the ``If-Modified-Since`` HTTP header from the request when serving static files. If the requested resource exists and has not been modified since the time indicated by ``If-Modified-Since``, a ``304 Not Modified`` response code is served, indicating that the cached version of the file is up-to-date. Otherwise (or if the request does not contain an ``If-Modified-Since`` header), the resource is served.

Error Handling
--------------

The following table shows the types of errors that Wire will handle when serving files:

+----------------------+------------+--------------------+-------------------------------------------------------+
| Problematic Function | Error Code | HTTP Response Code | Response Body                                         |
+======================+============+====================+=======================================================+
| ``fs.readFile``      | Any        | 404                | The file at ``wireConfig.errorPages.notFound.URI``    |
+----------------------+------------+--------------------+-------------------------------------------------------+
| ``fs.stat``          | Any        | 500                | The file at ``wireConfig.errorPages.serverError.URI`` |
+----------------------+------------+--------------------+-------------------------------------------------------+

.. caution:: Errors with reading the Wire configuration file (e.g., the file cannot be accessed at ``/usr/prefs/wire.json``, a required configuration option is missing) or error pages (e.g., the error page cannot be accessed) will raise an exception and cause Wire to crash.

Error Page Variables
^^^^^^^^^^^^^^^^^^^^

In error pages with MIME type ``text``, information about the server and error may be included in the response sent. Variables may be inserted anywhere within the file and are surrounded by the dollar (``$``) symbol.

.. note:: If two variables need to be inserted in an error page back-to-back, then each variable should have its own set of ``$`` symbols.

.. note:: Variables are case-sensitive.

The possible variables that may be used within an error page are described below. Each variable may be used zero, one, or multiple times.

+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Variable         | Description                                                                                                                                                                                                             |
+==================+=========================================================================================================================================================================================================================+
| ``$requrl$``     | The request URL                                                                                                                                                                                                         |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``$adjrequrl$``  | The request URL with "index.html" appended, if ``wireConfig.indexRedirect`` is set to ``true``. Otherwise, this is the same as ``$requrl$``. This variable will only function in the event of an ``fs.readFile`` error. |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``$osplatform$`` | The operating system platform of the server. See `os.platform() <https://nodejs.org/api/os.html#os_os_platform>`_.                                                                                                      |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``$ostype$``     | The operating system type of the server. See `os.type() <https://nodejs.org/api/os.html#os_os_type>`_.                                                                                                                  |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``$osversion$``  | The operating system release of the server. See `os.release() <https://nodejs.org/api/os.html#os_os_version>`_.                                                                                                         |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``$port$``       | The port on which the Wire server is listening.                                                                                                                                                                         |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``$errcode$``    | The code of the error. See `error.code <https://nodejs.org/api/errors.html#errors_error_code>`_.                                                                                                                        |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``$errno$``      | The number of the error. See `error.errno <https://nodejs.org/api/errors.html#errors_error_errno>`_.                                                                                                                    |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``$errmessage$`` | The error message. Note that this may contain information such as the absolute path to a resource on a server. See `error.message <https://nodejs.org/api/errors.html#errors_error_message_1>`_.                        |
+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

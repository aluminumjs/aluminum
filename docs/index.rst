**************************************
Welcome to the Aluminum Documentation.
**************************************

What is Aluminum?
=================

Aluminum is a lightweight, simple-to-install, and easy-to-use web server written entirely in `Node.js <https://www.nodejs.org>`_, "an asynchronous event-driven JavaScript runtime ... designed to build scalable network applications." It includes not only a traditional static/dynamic web server, but also various other features that simplify the web development process, such as authentication and network-based cryptography platforms.


Setup and General Knowledge
===========================

.. note:: In this documentation, ``/`` refers to the root directory of the Aluminum repository, except as otherwise noted.

To install Aluminum, simply clone the git repository, install the dependencies automatically with ``npm``, and copy the default user files from the ``/defaults`` directory to ``/usr``. Starting the server is as simple as typing ``npm start`` into your terminal.

.. seealso:: Please see the installation guide for more detailed instructions on installing Aluminum.

Aluminum is controlled by JSON configuration files. These files are found in the ``/usr/prefs`` directory.


.. toctree::
   :maxdepth: 2
   :caption: General Documentation
   :numbered:
   :hidden:

   general/listen-json


Features
========

Aluminum offers several unique and useful features:

* **Highly Customizable:** Use an official extension, a community-contributed one, or make your own.
* **Integrated Authentication Server:** Verify end users' identity without leaving the Aluminum platform.
* **PHP support:** If you're uncomfortable using Node.js for server-side scripting, Aluminum is also compatible with PHP.
* **And more:** Remote system resource monitor, network based time synchronization, math rendering, simplified cryptography, etc.


.. toctree::
   :maxdepth: 2
   :caption: Documentation by Feature
   :numbered:
   :hidden:

   features/wire

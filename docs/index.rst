**************************************
Welcome to the Aluminum Documentation.
**************************************

What is Aluminum?
=================

Aluminum is a lightweight, simple-to-install, and easy-to-use web server written entirely in `Node.js <https://www.nodejs.org>`_, "an asynchronous event-driven JavaScript runtime ... designed to build scalable network applications." It includes not only a traditional static/dynamic web server, but also various other features that simplify the web development process, such as authentication and network-based cryptography platforms.


Setup and General Knowledge
===========================

.. note:: In this documentation, ``/`` refers to the root directory of the Aluminum repository, except as otherwise noted.

To install Aluminum, simply clone the git repository, install the dependencies automatically with ``yarn``, and copy the default configuration files into the ``/prefs`` directory. Starting the web server is as simple as typing ``yarn run start`` into your terminal.

.. seealso:: If you want to install Aluminum, please see the installation guide for more detailed instructions.

Aluminum is controlled by configuration files written in JSON. These files are included in the ``/prefs`` directory.


.. toctree::
   :maxdepth: 2
   :caption: General Documentation
   :numbered:
   :hidden:

   general/ports


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

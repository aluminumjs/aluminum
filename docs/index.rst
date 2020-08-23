.. Aluminum documentation master file, created by
   sphinx-quickstart on Tue Jun 30 18:15:03 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

**************************************
Welcome to the Aluminum Documentation.
**************************************

What is Aluminum?
=================

Aluminum is a lightweight web server written entirely in `Node.js <https://www.nodejs.org>`_, "an asynchronous event-driven JavaScript runtime ... designed to build scalable network applications." It includes not only a traditional static/dynamic web server, but also various other features that simplify the web development process, such as an authentication server and a network-based cryptography server.

Why Aluminum?
=============

Aluminum is simple to install and easy to use. Simply clone the git repository, install the dependencies automatically with ``yarn``, and copy the default configuration files into the higher level directory. Starting the web server is as simple as typing ``yarn run start`` into your terminal.

.. seealso:: See the installation guide for a detailed tutorial on getting started with Aluminum.

It also offers several unique and useful features:

* **Highly Customizable:** Use an official extension, a community-contributed one, or make your own.
* **Integrated Authentication Server:** Verify end users' identity without leaving the Aluminum platform.
* **PHP support:** If you're uncomfortable using Node.js for server-side scripting, Aluminum is also compatible with PHP.
* **And more:** Remote system resource monitor, network based time synchronization, math rendering, simplified cryptography, etc.

Navigating the Documentation
============================

To navigate the documentation, use the sidebar to the left. To return to this page at any time, click or tap on the Aluminum logo at the top of the sidebar.


.. toctree::
   :maxdepth: 2
   :caption: General Documentation
   :numbered:

   general/ports


.. toctree::
   :maxdepth: 2
   :caption: Documentation by Feature
   :numbered:
   :hidden:

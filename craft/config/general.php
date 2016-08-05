<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
  '*' => array(
    'omitScriptNameInUrls' => true,
    'devMode' => true,
  ),

  'localhost/craftcms/public/' => array(
    'environmentVariables' => array(
      'basePath' => 'C:\wamp\www\craftcms\public/',
      'baseUrl'  => 'localhost/craftcms/public',
    )
  )
);

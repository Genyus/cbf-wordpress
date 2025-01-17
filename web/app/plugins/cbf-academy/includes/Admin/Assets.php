<?php
/**
 * Register admin assets.
 *
 * @class       AdminAssets
 * @version     1.0.0
 * @package     CBFAcademy/Classes/
 */

namespace CBFAcademy\Admin;

use CBFAcademy\Assets as AssetsMain;
use CBFAcademy\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Admin assets class
 */
final class Assets {

	/**
	 * Hook in methods.
	 */
	public static function hooks() {
		add_filter( '_enqueue_styles', array( __CLASS__, 'add_styles' ), 9 );
		add_filter( '_enqueue_scripts', array( __CLASS__, 'add_scripts' ), 9 );
		add_action( 'admin_enqueue_scripts', array( AssetsMain::class, 'load_scripts' ) );
		add_action( 'admin_print_scripts', array( AssetsMain::class, 'localize_printed_scripts' ), 5 );
		add_action( 'admin_print_footer_scripts', array( AssetsMain::class, 'localize_printed_scripts' ), 5 );
	}


	/**
	 * Add styles for the admin.
	 *
	 * @param array $styles Admin styles.
	 * @return array<string,array>
	 */
	public static function add_styles( $styles ) {

		$styles['cbf-academy-admin'] = array(
			'src' => AssetsMain::localize_asset( 'css/admin/cbf-academy.css' ),
		);

		return $styles;
	}


	/**
	 * Add scripts for the admin.
	 *
	 * @param  array $scripts Admin scripts.
	 * @return array<string,array>
	 */
	public static function add_scripts( $scripts ) {

		$scripts['cbf-academy-admin'] = array(
			'src'  => AssetsMain::localize_asset( 'js/admin/cbf-academy.js' ),
			'data' => array(
				'ajax_url' => Utils::ajax_url(),
			),
		);

		return $scripts;
	}
}

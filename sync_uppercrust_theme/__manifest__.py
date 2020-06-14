# -*- coding: utf-8 -*-
# Part of Odoo. See COPYRIGHT & LICENSE files for full copyright and licensing details.

{
    'name': 'Uppercrust Theme',
    'description': 'Customized Uppercrust Theme',
    'version': "1.0",
    'author': "Synconics Technologies Pvt. Ltd.",
    'website': "www.synconics.com",
    'category': 'Theme/Corporate',
    'depends': ['portal', 'website', 'theme_default'],
    'data': [
        'views/theme_uppercrust_templates.xml',
        'views/theme_uppercrust_snippets.xml',
        'views/progressbar_snippet.xml',
        'views/counter_snippet.xml',
        'views/s_video_snippet.xml',
        'views/magnify_snippet.xml',
        'views/galary.xml',
    ],
    'images': [
        'static/description/uppercrust_screenshot.jpg',
    ],
    'price': 75,
    'currency': 'EUR',
#    'live_test_url': 'http://uppercrust-default-theme-v11.synconics.com',
    'active': True,
    'installable': True,
}

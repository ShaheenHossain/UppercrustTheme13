# -*- coding: utf-8 -*-
from odoo import api, models

from odoo.addons.base.models.qweb import QWeb
from odoo.addons.website_page_minify.htmlmin.htmlmin import main

class IrQWeb(models.AbstractModel, QWeb):
    _inherit = 'ir.qweb'

    @api.model
    def render(self, id_or_xml_id, values=None, **options):
        """
        @desc: Inherited 'render' method of odoo base to minify website pages HTML using Python Minify Library.
        """
        result = super(IrQWeb, self).render(id_or_xml_id, values=values, **options)
        if values.get('request',False) and values.get('request',False).is_frontend:
            return main.minify(result.decode(), remove_empty_space=True).encode()
        return result

# -*- coding: utf-8 -*-
# Part of Odoo. See COPYRIGHT & LICENSE files for full copyright and licensing details.

from odoo import models, fields, api, _


class ResPartner(models.Model):
    _inherit = "res.partner"

    def google_map_address(self, zoom=8):
        params = {
            'q': '%s, %s %s, %s' % (self.street or '', self.city  or '', self.zip or '', self.country_id and self.country_id.name_get()[0][1] or ''),
        }
        return params['q'].replace(',', ' ')


class ResCompany(models.Model):
    _inherit = "res.company"

    def google_map_address(self, zoom=8):
        partner = self.sudo().partner_id
        return partner and partner.google_map_address(zoom) or None


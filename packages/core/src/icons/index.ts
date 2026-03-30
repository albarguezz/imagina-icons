import { userPlus } from "./users/user-plus.js";
import { devices } from "./hardware/devices.js";
import { devicePlus } from "./hardware/device-plus.js";
import { users } from "./users/users.js";
import { filterSearch } from "./search/filter-search.js";
import { filterPlus} from "./search/filter-plus.js";
import { layout } from "./layout.js";
import { user } from "./users/user.js";
import { listDetails } from "./lists/list-details.js";
import { settings } from "./connect/settings.js";
import { history } from "./time/history.js";
import { bug } from "./code/bug.js";
import { terminal } from "./code/terminal.js";
import { broom } from "./broom.js";
import { recycle } from "./connect/recycle.js";
import {logs} from "./code/logs.js";
import {power} from "./connect/power.js";
import {deviceMobileCog} from "./hardware/device-mobile-cog.js";
import {search} from "./search/search.js";
import {tag} from "./tag.js";
import {tags} from "./tags.js";
import {code} from "./code/code.js";
import {database} from "./code/database.js";
import {deviceFloppy} from "./hardware/device-floppy.js";
import {creditCard} from "./cards/credit-card.js";
import {printer} from "./files/printer.js";
import {pdf} from "./files/pdf.js";
import {fileExcel} from "./files/file-excel.js";
import {eye} from "./users/eye.js";
import {filePdf} from "./files/file-pdf.js";
import {refresh} from "./connect/refresh.js";
import {password} from "./code/password.js";
import { userCog } from "./users/user-cog.js";
import {chartPie} from "./charts/chart-pie.js";
import {chartDonut} from "./charts/chart-donut.js";
import {chartArcs} from "./charts/chart-arcs.js";
import {brush} from "./brush.js";
import {pencil} from "./pencil.js";
import {circleCheck} from "./time/circle-check.js";
import {clock} from "./time/clock.js";
import {logout} from "./logout.js";
import {deviceMobileX} from "./hardware/device-mobile-x.js";
import {chartInfographic} from "./charts/chart-infographic.js";
import {reportAnalytics} from "./files/report-analytics.js";
import {circleExclamation} from "./alerts/circle-exclamation.js";

export const icons = {
    'brush': brush,
    'bug': bug,
    //'broom': broom,
    'chart-arcs': chartArcs,
    'chart-donut': chartDonut,
    'chart-infographic': chartInfographic,
    'chart-pie': chartPie,
    'circle-check': circleCheck,
    'circle-exclamation': circleExclamation,
    'clock': clock,
    'credit-card': creditCard,
    'code': code,
    'database': database,
    'devices': devices,
    'device-floppy': deviceFloppy,
    'device-mobile-cog': deviceMobileCog,
    'device-mobile-x': deviceMobileX,
    'device-plus': devicePlus,
    'eye': eye,
    'history': history,
    'file-excel': fileExcel,
    'file-pdf': filePdf,
    'filter-plus': filterPlus,
    'filter-search': filterSearch,
    'layout': layout,
    'list-details': listDetails,
    'logout': logout,
    'logs': logs,
    'password': password,
    'pdf': pdf,
    'pencil': pencil,
    'printer': printer,
    'power': power,
    'refresh': refresh,
    'recycle': recycle,
    'report-analytics': reportAnalytics,
    'search': search,
    'settings': settings,
    'tag': tag,
    'tags': tags,
    'terminal': terminal,
    'user': user,
    'users': users,
    'user-cog': userCog,
    'user-plus': userPlus,
} as const

export type IconName = keyof typeof icons
export type { IconVariant, IconDefinition } from '../types.js'
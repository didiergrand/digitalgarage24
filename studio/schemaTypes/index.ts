import {homepage} from './homepage';
import {blogCategory} from './blogCategory';
import {blogAuthor} from "./blogAuthor";
import {blogPost} from './blogPost';
import {work} from './work';
import {workCategory} from './workCategory';
import {workAuthor} from "./workAuthor";
import {workPost} from './workPost';
import {about} from './about';
import { navigation } from "./navigation";
import { navigationLink } from "./navigationLink";
import {formType} from './formType'
import {heroType} from './heroType'
import {imageGalleryType} from './imageGalleryType'
import {pageType} from './pageType'
import {textWithIllustrationType} from './textWithIllustration'
import {videoType} from './videoType'

export const schemaTypes = [homepage,blogCategory,blogAuthor,blogPost,about,work,workCategory,workAuthor,workPost,navigation,navigationLink,
  pageType,
  heroType,
  textWithIllustrationType,
  imageGalleryType,
  formType,
  videoType,
];